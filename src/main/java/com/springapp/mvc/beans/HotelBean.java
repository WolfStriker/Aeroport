import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "hotel", schema = "", catalog = "aeroport")
public class HotelBean {
    private int idHotel;
    private String nomHotel;
    private Integer etoiles;
    private Integer tarif;

    @Id
    @Column(name = "idHotel")
    public int getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(int idHotel) {
        this.idHotel = idHotel;
    }

    @Basic
    @Column(name = "nomHotel")
    public String getNomHotel() {
        return nomHotel;
    }

    public void setNomHotel(String nomHotel) {
        this.nomHotel = nomHotel;
    }

    @Basic
    @Column(name = "etoiles")
    public Integer getEtoiles() {
        return etoiles;
    }

    public void setEtoiles(Integer etoiles) {
        this.etoiles = etoiles;
    }

    @Basic
    @Column(name = "tarif")
    public Integer getTarif() {
        return tarif;
    }

    public void setTarif(Integer tarif) {
        this.tarif = tarif;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HotelBean hotelBean = (HotelBean) o;

        if (idHotel != hotelBean.idHotel) return false;
        if (etoiles != null ? !etoiles.equals(hotelBean.etoiles) : hotelBean.etoiles != null) return false;
        if (nomHotel != null ? !nomHotel.equals(hotelBean.nomHotel) : hotelBean.nomHotel != null) return false;
        if (tarif != null ? !tarif.equals(hotelBean.tarif) : hotelBean.tarif != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idHotel;
        result = 31 * result + (nomHotel != null ? nomHotel.hashCode() : 0);
        result = 31 * result + (etoiles != null ? etoiles.hashCode() : 0);
        result = 31 * result + (tarif != null ? tarif.hashCode() : 0);
        return result;
    }
}
