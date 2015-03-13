package com.springapp.mvc.beans;

import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "user", schema = "", catalog = "aeroport")
public class UserBean {
    private int login;
    private String password;

    @Id
    @Column(name = "login")
    public int getLogin() {
        return login;
    }

    public void setLogin(int login) {
        this.login = login;
    }

    @Basic
    @Column(name = "password")
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
