<template>
  <div 
    v-if="isLoading" 
    class="fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-indigo-950 to-primary-900 transition-opacity duration-500"
    :class="{ 'opacity-0 pointer-events-none': !isLoading }"
  >
    <div class="flex flex-col items-center">
      <!-- Logo animace -->
      <div class="relative w-20 h-20 mb-8">
        <svg class="w-full h-full" viewBox="0 0 40 40" fill="none">
          <path 
            d="M20 5L5 12.5L20 20L35 12.5L20 5Z" 
            fill="#6366f1" 
            class="animate-pulse"
          />
          <path 
            d="M5 27.5L20 35L35 27.5V12.5L20 20L5 12.5V27.5Z" 
            fill="#4f46e5" 
            fill-opacity="0.7" 
            class="animate-pulse" 
          />
        </svg>
        
        <!-- Animované částice -->
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute w-2 h-2 bg-blue-300 rounded-full animate-ping" style="top: 0; left: 50%;"></div>
          <div class="absolute w-2 h-2 bg-indigo-300 rounded-full animate-ping" style="top: 50%; right: 0; animation-delay: 0.5s"></div>
          <div class="absolute w-2 h-2 bg-violet-300 rounded-full animate-ping" style="bottom: 0; left: 50%; animation-delay: 1s"></div>
        </div>
      </div>
      
      <!-- Text animace -->
      <div class="overflow-hidden font-sans">
        <h2 class="text-2xl font-bold text-white mb-2">
          <span class="inline-block">Šimon Novák</span>
        </h2>
      </div>
      
      <!-- Loading progress -->
      <div class="w-48 h-1 bg-indigo-900 rounded-full mt-4 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${loadingProgress}%` }"
        ></div>
      </div>
      <div class="text-blue-300 text-sm mt-2">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  data() {
    return {
      isLoading: true,
      loadingProgress: 0,
      loadingTexts: [
        'Připravuji portfolio...',
        'Načítám projekty...',
        'Téměř hotovo...',
        'Finalizuji...'
      ],
      currentTextIndex: 0
    }
  },
  computed: {
    loadingText() {
      return this.loadingTexts[this.currentTextIndex];
    }
  },
  mounted() {
    // Simulace načítání
    const increment = 100 / (this.loadingTexts.length * 5);
    let count = 0;
    
    const interval = setInterval(() => {
      count++;
      this.loadingProgress += increment;
      
      if (count % 5 === 0 && this.currentTextIndex < this.loadingTexts.length - 1) {
        this.currentTextIndex++;
      }
      
      if (this.loadingProgress >= 100) {
        clearInterval(interval);
        this.loadingProgress = 100;
        
        // Simulace dokončení načítání
        setTimeout(() => {
          this.isLoading = false;
          this.$emit('loading-complete');
        }, 500);
      }
    }, 400);
  }
}
</script>