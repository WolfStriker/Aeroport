package com.springapp.mvc.beans;

import javax.persistence.*;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "vol", schema = "", catalog = "aeroport")
public class VolBean {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idVol")
    private int idVol;
	
	@NotEmpty(message="Le lieu de départ ne peut être vide")
    @Column(name = "lieuDepart")
    private String lieuDepart;
	
	@NotEmpty(message="Le lieu d'arrivée ne peut être vide")
    @Column(name = "lieuArrivee")
    private String lieuArrivee;
	
	@NotEmpty(message="La date de départ ne peut être vide")
    @Column(name = "dateDepart")
    private String dateDepart;
	
	@NotEmpty(message="La date d'arrivée ne peut être vide")
    @Column(name = "dateArrivee")
    private String dateArrivee;
	
	@NotEmpty(message="Le prix du vol ne peut être vide")
    @Column(name = "prix")
    private String prix;

	@Column(name = "aeroport_idAeroport")
	private int idAeroport;
    
    public int getIdVol() {
        return idVol;
    }

    public void setIdVol(int idVol) {
        this.idVol = idVol;
    }
    
    public int getIdAeroport() {
        return idAeroport;
    }

    public void setIdAeroport(int idVol) {
        this.idAeroport = idVol;
    }
    
    public String getLieuDepart() {
        return lieuDepart;
    }

    public void setLieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
    }

    public String getLieuArrivee() {
        return lieuArrivee;
    }

    public void setLieuArrivee(String lieuArrivee) {
        this.lieuArrivee = lieuArrivee;
    }

    public String getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(String dateDepart) {
        this.dateDepart = dateDepart;
    }

    public String getDateArrivee() {
        return dateArrivee;
    }

    public void setDateArrivee(String dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VolBean volBean = (VolBean) o;

        if (idVol != volBean.idVol) return false;
        if (dateArrivee != null ? !dateArrivee.equals(volBean.dateArrivee) : volBean.dateArrivee != null) return false;
        if (dateDepart != null ? !dateDepart.equals(volBean.dateDepart) : volBean.dateDepart != null) return false;
        if (lieuArrivee != null ? !lieuArrivee.equals(volBean.lieuArrivee) : volBean.lieuArrivee != null) return false;
        if (lieuDepart != null ? !lieuDepart.equals(volBean.lieuDepart) : volBean.lieuDepart != null) return false;
        if (prix != null ? !prix.equals(volBean.prix) : volBean.prix != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idVol;
        result = 31 * result + (lieuDepart != null ? lieuDepart.hashCode() : 0);
        result = 31 * result + (lieuArrivee != null ? lieuArrivee.hashCode() : 0);
        result = 31 * result + (dateDepart != null ? dateDepart.hashCode() : 0);
        result = 31 * result + (dateArrivee != null ? dateArrivee.hashCode() : 0);
        result = 31 * result + (prix != null ? prix.hashCode() : 0);
        return result;
    }
}
