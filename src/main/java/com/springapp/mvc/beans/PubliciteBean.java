import javax.persistence.*;
import java.sql.Date;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "publicite", schema = "", catalog = "aeroport")
public class PubliciteBean {
    private int idPublicite;
    private Date dateDiffusion;
    private String heureDiffusion;

    @Id
    @Column(name = "idPublicite")
    public int getIdPublicite() {
        return idPublicite;
    }

    public void setIdPublicite(int idPublicite) {
        this.idPublicite = idPublicite;
    }

    @Basic
    @Column(name = "dateDiffusion")
    public Date getDateDiffusion() {
        return dateDiffusion;
    }

    public void setDateDiffusion(Date dateDiffusion) {
        this.dateDiffusion = dateDiffusion;
    }

    @Basic
    @Column(name = "heureDiffusion")
    public String getHeureDiffusion() {
        return heureDiffusion;
    }

    public void setHeureDiffusion(String heureDiffusion) {
        this.heureDiffusion = heureDiffusion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PubliciteBean that = (PubliciteBean) o;

        if (idPublicite != that.idPublicite) return false;
        if (dateDiffusion != null ? !dateDiffusion.equals(that.dateDiffusion) : that.dateDiffusion != null)
            return false;
        if (heureDiffusion != null ? !heureDiffusion.equals(that.heureDiffusion) : that.heureDiffusion != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idPublicite;
        result = 31 * result + (dateDiffusion != null ? dateDiffusion.hashCode() : 0);
        result = 31 * result + (heureDiffusion != null ? heureDiffusion.hashCode() : 0);
        return result;
    }
}
