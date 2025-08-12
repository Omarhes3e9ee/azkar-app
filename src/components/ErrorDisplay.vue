<template>
  <div v-if="errors.length > 0 || warnings.length > 0" class="error-container">
    <!-- Errors -->
    <div v-if="errors.length > 0" class="error-section">
      <h3 class="error-title">
        <span class="error-icon">❌</span>
        Errors ({{ errors.length }})
      </h3>
      <div class="error-list">
        <div
          v-for="error in errors"
          :key="error.id"
          class="error-item"
        >
          <div class="error-header">
            <span class="error-message">{{ error.message }}</span>
            <button
              @click="removeError(error.id)"
              class="error-close"
              title="Dismiss error"
            >
              ×
            </button>
          </div>
          <div v-if="error.context" class="error-context">
            Context: {{ error.context }}
          </div>
          <div class="error-timestamp">
            {{ formatTimestamp(error.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Warnings -->
    <div v-if="warnings.length > 0" class="warning-section">
      <h3 class="warning-title">
        <span class="warning-icon">⚠️</span>
        Warnings ({{ warnings.length }})
      </h3>
      <div class="warning-list">
        <div
          v-for="warning in warnings"
          :key="warning.id"
          class="warning-item"
        >
          <div class="warning-header">
            <span class="warning-message">{{ warning.message }}</span>
            <button
              @click="removeWarning(warning.id)"
              class="warning-close"
              title="Dismiss warning"
            >
              ×
            </button>
          </div>
          <div v-if="warning.context" class="warning-context">
            Context: {{ warning.context }}
          </div>
          <div class="warning-timestamp">
            {{ formatTimestamp(warning.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="error-actions">
      <button
        @click="clearAll"
        class="clear-all-btn"
      >
        Clear All
      </button>
      <button
        @click="exportErrors"
        class="export-btn"
      >
        Export Report
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    errors: {
      type: Array,
      default: () => []
    },
    warnings: {
      type: Array,
      default: () => []
    }
  },
  emits: ['remove-error', 'remove-warning', 'clear-all'],
  setup(props, { emit }) {
    const removeError = (id) => {
      emit('remove-error', id);
    };

    const removeWarning = (id) => {
      emit('remove-warning', id);
    };

    const clearAll = () => {
      emit('clear-all');
    };

    const formatTimestamp = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString();
    };

    const exportErrors = () => {
      const report = {
        timestamp: new Date().toISOString(),
        errors: props.errors,
        warnings: props.warnings,
        summary: {
          totalErrors: props.errors.length,
          totalWarnings: props.warnings.length
        }
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `error-report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return {
      removeError,
      removeWarning,
      clearAll,
      formatTimestamp,
      exportErrors
    };
  }
};
</script>

<style scoped>
.error-container {
  margin: 1rem 0;
}

.error-section,
.warning-section {
  margin-bottom: 1rem;
}

.error-title,
.warning-title {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-icon,
.warning-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.error-title {
  color: #dc2626;
}

.warning-title {
  color: #d97706;
}

.error-list,
.warning-list {
  space-y: 0.5rem;
}

.error-item,
.warning-item {
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.error-item {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
}

.warning-item {
  background-color: #fffbeb;
  border: 1px solid #fed7aa;
}

.error-header,
.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.error-message,
.warning-message {
  font-weight: 500;
  flex: 1;
  margin-right: 0.5rem;
}

.error-message {
  color: #dc2626;
}

.warning-message {
  color: #d97706;
}

.error-close,
.warning-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.error-close {
  color: #dc2626;
}

.error-close:hover {
  background-color: #fecaca;
}

.warning-close {
  color: #d97706;
}

.warning-close:hover {
  background-color: #fed7aa;
}

.error-context,
.warning-context {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.error-context {
  color: #991b1b;
}

.warning-context {
  color: #92400e;
}

.error-timestamp,
.warning-timestamp {
  font-size: 0.75rem;
  opacity: 0.7;
}

.error-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.clear-all-btn,
.export-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-all-btn {
  background-color: #dc2626;
  color: white;
}

.clear-all-btn:hover {
  background-color: #b91c1c;
}

.export-btn {
  background-color: #3b82f6;
  color: white;
}

.export-btn:hover {
  background-color: #2563eb;
}
</style>
