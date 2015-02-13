package com.springapp.mvc.beans;

import com.springapp.mvc.beans.PubliciteHasVolBeanPK;

import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "publicite_has_vol", schema = "", catalog = "aeroport")
@IdClass(PubliciteHasVolBeanPK.class)
public class PubliciteHasVolBean {
    private int publiciteIdPublicite;
    private int volIdVol;

    @Id
    @Column(name = "publicite_idPublicite")
    public int getPubliciteIdPublicite() {
        return publiciteIdPublicite;
    }

    public void setPubliciteIdPublicite(int publiciteIdPublicite) {
        this.publiciteIdPublicite = publiciteIdPublicite;
    }

    @Id
    @Column(name = "vol_idVol")
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

        PubliciteHasVolBean that = (PubliciteHasVolBean) o;

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
