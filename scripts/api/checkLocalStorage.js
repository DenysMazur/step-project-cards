export default function cheackLocalStorage() {
  if (!localStorage.getItem('token')) {
    return false;
  }

  return true;
}