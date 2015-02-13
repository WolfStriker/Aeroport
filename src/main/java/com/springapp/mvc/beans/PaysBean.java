import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "pays", schema = "", catalog = "aeroport")
public class PaysBean {
    private int idPays;
    private String nomPays;

    @Id
    @Column(name = "idPays")
    public int getIdPays() {
        return idPays;
    }

    public void setIdPays(int idPays) {
        this.idPays = idPays;
    }

    @Basic
    @Column(name = "nomPays")
    public String getNomPays() {
        return nomPays;
    }

    public void setNomPays(String nomPays) {
        this.nomPays = nomPays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PaysBean paysBean = (PaysBean) o;

        if (idPays != paysBean.idPays) return false;
        if (nomPays != null ? !nomPays.equals(paysBean.nomPays) : paysBean.nomPays != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idPays;
        result = 31 * result + (nomPays != null ? nomPays.hashCode() : 0);
        return result;
    }
}
