import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function InputComponent({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  prefix,
  secureTextEntry = false,
  editable = true,
  error,
}) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
        ]}
      >
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          editable={editable}
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  label: {
    marginBottom: 8,
    color: '#374151',
    fontWeight: '500',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  prefix: {
    marginRight: 8,
    color: '#6B7280',
    fontWeight: '600',
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 16,
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
  },
});