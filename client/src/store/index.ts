import { makeAutoObservable } from "mobx";

export interface storeInterface {
  isLoading: boolean;
  isLoggedIn: boolean;
}
export default class Store {
  state: storeInterface;
  constructor() {
    this.state = {
      isLoading: false,
      isLoggedIn: false,
    };
    makeAutoObservable(this);
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.state.isLoggedIn = true;
    } else {
      this.state.isLoggedIn = false;
    }
  }

  async login(username: string, password: string) {
    const params = new URLSearchParams({
      username: username,
      password: password,
    });
    try {
      this.state.isLoading = true;
      console.log(`${import.meta.env.VITE_API_URL}`);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/authorization/login?${params}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        this.state.isLoggedIn = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.state.isLoading = false;
      this.checkAuth();
    }
  }

  async logout() {
    try {
      this.state.isLoading = true;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/authorization/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        this.state.isLoggedIn = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.state.isLoading = false;
    }
  }
}
