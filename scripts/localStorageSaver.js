export default class LocalStorageSaver {
  constructor(flagOfSave = 'false', data) {
    this.flagOfSave = flagOfSave;
    this.data = data;
  }

  saveData() {
    if (this.flagOfSave) {
      localStorage.setItem('token', this.data);
      // console.log(localStorage.getItem('token'));
    }
    return;
  }
}