import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  /**
   * Save an object to localStorage.
   * @param key The key under which the data will be stored.
   * @param value The data to store (will be serialized to JSON).
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedData = JSON.stringify(value, (key, value) => {
        // Exclude circular references or problematic keys
        if (key === '_parentage' || key === '_finalizers') {
          return undefined;
        }
        return value;
      });
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  }
  /**
   * Retrieve an object from localStorage.
   * @param key The key of the stored data.
   * @returns The deserialized object, or `null` if no data is found.
   */
  getItem<T>(key: string): T | null {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage', error);
      return null;
    }
  }

  /**
   * Remove an item from localStorage.
   * @param key The key of the data to remove.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage', error);
    }
  }

  /**
   * Clear all items in localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
