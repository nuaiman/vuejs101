<template>
  <div class="app">
    <h1>Todo App</h1>

    <!-- Add Task -->
    <div class="input-row">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add task..."
      />
      <button @click="addTask">Add</button>
    </div>

    <!-- Search -->
    <input v-model="search" placeholder="Search tasks..." />

    <!-- Filters -->
    <div class="filters">
      <button
        v-for="f in filters"
        :key="f"
        @click="activeFilter = f"
        :class="{ active: activeFilter === f }"
      >
        {{ f }}
      </button>
    </div>

    <!-- Task List -->
    <ul class="task-list">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :class="{ done: task.completed, editing: editingId === task.id }"
      >
        <!-- Editing Mode -->
        <template v-if="editingId === task.id">
          <input
            v-model="editBuffer"
            class="edit-input"
            @keyup.enter="finishEdit(task)"
            @keydown.esc="cancelEdit"
            @blur="finishEdit(task)"
            :ref="el => el && el.focus()"
          />
        </template>

        <!-- Normal Mode -->
        <template v-else>
          <button class="delete" @click="removeTask(task.id)">✕</button>
          <button class="fav" @click="toggleFav(task)">
            {{ task.favorite ? "★" : "☆" }}
          </button>
          <input type="checkbox" v-model="task.completed" @change="save" />
          <span @click="startEdit(task)">{{ task.text }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

/* ---------------- State ---------------- */
const newTask = ref("");
const search = ref("");
const activeFilter = ref("All");
const filters = ["All", "Completed", "Incomplete", "Favorite"];
const tasks = ref([]);

const editingId = ref(null);
const editBuffer = ref("");

/* ---------------- Local Storage ---------------- */
onMounted(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks.value = JSON.parse(saved);
});

// Watch tasks deeply
watch(tasks, save, { deep: true });

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

/* ---------------- Task Management ---------------- */
function addTask() {
  const text = newTask.value.trim();
  if (!text) return;

  tasks.value.push({
    id: Date.now(),
    text,
    completed: false,
    favorite: false
  });
  newTask.value = "";
}

function removeTask(id) {
  if (editingId.value === id) cancelEdit();
  tasks.value = tasks.value.filter(t => t.id !== id);
}

function toggleFav(task) {
  task.favorite = !task.favorite;
  save();
}

/* ---------------- Editing ---------------- */
function startEdit(task) {
  editingId.value = task.id;
  editBuffer.value = task.text;
}

function finishEdit(task) {
  if (editingId.value !== task.id) return;

  const trimmed = editBuffer.value.trim();
  if (!trimmed) removeTask(task.id);
  else task.text = trimmed;

  cancelEdit();
  save();
}

function cancelEdit() {
  editingId.value = null;
  editBuffer.value = "";
}

/* ---------------- Computed ---------------- */
const filteredTasks = computed(() => {
  return tasks.value
    .filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()))
    .filter(t => {
      if (activeFilter.value === "Completed") return t.completed;
      if (activeFilter.value === "Incomplete") return !t.completed;
      if (activeFilter.value === "Favorite") return t.favorite;
      return true;
    });
});
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
input,
button {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  cursor: pointer;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}
.filters button.active {
  background: #333;
  color: #fff;
  border-color: #333;
}

.task-list {
  list-style: none;
  padding: 0;
}
.task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.task-list li.done span {
  text-decoration: line-through;
  opacity: 0.6;
}

.fav {
  background: none;
  border: none;
  cursor: pointer;
}
.delete {
  background: #e53e3e;
  color: white;
  border: none;
  cursor: pointer;
}
.edit-input {
  flex-grow: 1;
}
</style>
