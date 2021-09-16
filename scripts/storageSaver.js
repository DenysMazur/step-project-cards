export default class StorageSaver {
  constructor(flagOfSave = 'false', data) {
    this.flagOfSave = flagOfSave;
    this.data = data;
  }

  saveData() {
    if (this.flagOfSave) {
      localStorage.setItem('token', this.data);
    } else {
      sessionStorage.setItem('token', this.data)
    }
    return;
  }
}