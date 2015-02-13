package com.springapp.mvc.beans;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by Antoine on 13/02/2015.
 */
public class PubliciteHasVolBeanPK implements Serializable {
    private int publiciteIdPublicite;
    private int volIdVol;

    @Column(name = "publicite_idPublicite")
    @Id
    public int getPubliciteIdPublicite() {
        return publiciteIdPublicite;
    }

    public void setPubliciteIdPublicite(int publiciteIdPublicite) {
        this.publiciteIdPublicite = publiciteIdPublicite;
    }

    @Column(name = "vol_idVol")
    @Id
    public int getVolIdVol() {
        return volIdVol;
    }

    public void setVolIdVol(int volIdVol) {
        this.volIdVol = volIdVol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PubliciteHasVolBeanPK that = (PubliciteHasVolBeanPK) o;

        if (publiciteIdPublicite != that.publiciteIdPublicite) return false;
        if (volIdVol != that.volIdVol) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = publiciteIdPublicite;
        result = 31 * result + volIdVol;
        return result;
    }
}
