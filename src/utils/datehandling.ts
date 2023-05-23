const dataFunc = {
    addDays(date: Date, days: number): Date {
      date.setDate(date.getDate() + days);
      return date;
    },

    removeDays(date: Date, days: number): Date {
      date.setDate(date.getDate() - days);
      return date;
    },

    sliceDate(date: Date): string {
      return date.toISOString().slice(0, 10);
    },
  };