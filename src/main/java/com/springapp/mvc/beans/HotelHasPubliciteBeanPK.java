package com.springapp.mvc.beans;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by Antoine on 13/02/2015.
 */
public class HotelHasPubliciteBeanPK implements Serializable {
    private int hotelIdHotel;
    private int publiciteIdPublicite;

    @Column(name = "hotel_idHotel")
    @Id
    public int getHotelIdHotel() {
        return hotelIdHotel;
    }

    public void setHotelIdHotel(int hotelIdHotel) {
        this.hotelIdHotel = hotelIdHotel;
    }

    @Column(name = "publicite_idPublicite")
    @Id
    public int getPubliciteIdPublicite() {
        return publiciteIdPublicite;
    }

    public void setPubliciteIdPublicite(int publiciteIdPublicite) {
        this.publiciteIdPublicite = publiciteIdPublicite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HotelHasPubliciteBeanPK that = (HotelHasPubliciteBeanPK) o;

        if (hotelIdHotel != that.hotelIdHotel) return false;
        if (publiciteIdPublicite != that.publiciteIdPublicite) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hotelIdHotel;
        result = 31 * result + publiciteIdPublicite;
        return result;
    }
}
