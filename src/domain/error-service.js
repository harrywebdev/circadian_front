export default class ErrorService {
  static onError(error) {
    console.error(error);

    // super basic
    if (error.message) {
      alert(error.message);
    }
  }
}
