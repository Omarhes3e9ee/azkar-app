import { ref } from 'vue';

export function useErrorHandler() {
  const errors = ref([]);
  const warnings = ref([]);
  const isLoading = ref(false);

  const addError = (error, context = '') => {
    const errorObj = {
      id: Date.now(),
      message: error.message || error,
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack
    };
    errors.value.push(errorObj);
    console.error('Error:', errorObj);
  };

  const addWarning = (warning, context = '') => {
    const warningObj = {
      id: Date.now(),
      message: warning,
      context,
      timestamp: new Date().toISOString()
    };
    warnings.value.push(warningObj);
    console.warn('Warning:', warningObj);
  };

  const clearErrors = () => {
    errors.value = [];
  };

  const clearWarnings = () => {
    warnings.value = [];
  };

  const clearAll = () => {
    clearErrors();
    clearWarnings();
  };

  const hasErrors = () => errors.value.length > 0;
  const hasWarnings = () => warnings.value.length > 0;

  const getLatestError = () => errors.value[errors.value.length - 1];
  const getLatestWarning = () => warnings.value[warnings.value.length - 1];

  return {
    errors,
    warnings,
    isLoading,
    addError,
    addWarning,
    clearErrors,
    clearWarnings,
    clearAll,
    hasErrors,
    hasWarnings,
    getLatestError,
    getLatestWarning
  };
}
