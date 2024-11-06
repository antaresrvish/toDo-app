<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center font-inter backdrop-blur-[3px]">
      <div class="bg-gray-50 rounded-lg p-6 text-center">
        <h2 class="text-lg font-medium">Are you sure you want to delete this list?</h2>
        <div class="mt-4 flex justify-center space-x-4">
          <button @click="confirm" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg duration-300">Yes</button>
          <button @click="cancel" class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg duration-300">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean
    },
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  };
  </script>
  