<script setup lang="ts">
import { ref } from "vue";

interface Skill {
  id: number;
  name: string;
  level: string;
}

const mySkill = ref<Skill[]>([
  { id: 1, name: "Typescript", level: "Beginner" },
  { id: 2, name: "C##", level: "Beginner" },
  { id: 3, name: "Vue", level: "Learning" },
]);
</script>

<template>
  <div class="bg-jungle-green-900 max-w-screen max-h-screen text-white">
    <header class="bg-jungle-green-950 w-full h-20 flex items-center justify-between px-10">
      <img src="./logo5.png" alt="Logo" class="h-full py-1" />
      <nav>
        <ul>
          <li class="flex gap-10">
            <a href="#">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">SERVICES</a>
            <a href="#">CONTACT</a>
          </li>
        </ul>
      </nav>
    </header>

    <section
      v-for="skill in mySkill"
      :key="skill.id"
      class="bg-jungle-green-800 w-full h-screen text-center flex flex-col items-center justify-center font-poppins text-2xl"
    >
      <h1>My Skills</h1>

      <ul>
        <li>
          <strong>{{ skill.name }}</strong> > {{ skill.level }}
        </li>
      </ul>

      <h1>{{ skill.name }}</h1>
    </section>

    <section
      class="bg-jungle-green-700 w-full h-screen flex items-center justify-center font-poppins text-2xl"
    >
    <h1 class="text-5xl text-gray-100 font-extrabold mx-5 animate-bounce"> </h1>
    </section>

    <footer
      class="w-full h-20 bg-jungle-green-950 flex items-center justify-center font-poppins text-lg"
    >
      My Vue App Footer
    </footer>
  </div>
</template>
