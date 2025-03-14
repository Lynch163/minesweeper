import { ref, watchEffect } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  });

  return {
    theme,
    setTheme
  };
}
