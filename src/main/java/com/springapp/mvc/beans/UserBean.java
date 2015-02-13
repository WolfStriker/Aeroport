package com.springapp.mvc.beans;

/**
 * Created by Antoine on 06/02/2015.
 */
@javax.persistence.Entity
@javax.persistence.Table(name = "user", schema = "", catalog = "aeroport")
public class UserBean {
    private int login;
    private String password;

    @javax.persistence.Id
    @javax.persistence.Column(name = "login")
    public int getLogin() {
        return login;
    }

    public void setLogin(int login) {
        this.login = login;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserBean userBean = (UserBean) o;

        if (login != userBean.login) return false;
        if (password != null ? !password.equals(userBean.password) : userBean.password != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = login;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
}
