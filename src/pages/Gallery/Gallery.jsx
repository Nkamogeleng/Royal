import Evelyn from '../../images/Evelyn.jpg';
import Immaculate from '../../images/Immaculate.jpg';
import Remilekun from '../../images/Remilekun.jpg';
import Gbemisola from '../../images/Gbemi.jpg';
import Vivian from '../../images/Vivian.jpg';
import Kindness from "../../images/Kindness.png"
import './gallery.css';

export default function Gallery() {
	return (
		<div className="wrapper">
			<h1> Meet Team Royal</h1>
			<div className="gallery">
				<div className="gallery-img">
					<p className="gallery-info">Evelyn Anyebe</p>
					<img src={Evelyn} alt="Evelyn" />
					<p className="gallery-email">anyebeevelyn@gmail.com</p>
				</div>
				<div className="gallery-img">
					<p className="gallery-info">Gbemisola Kotoye</p>
					<img src={Gbemisola} alt="Gbemisola" />
					<p className="gallery-email">gbemisola.kotoye@womentechsters.org</p>
				</div>
				<div className="gallery-img">
					<p className="gallery-info">Immaculate Nkamogeleng</p>
					<img src={Immaculate} alt="Immaculate" />
					<p className="gallery-email">kamo21@gmail.com</p>
				</div>
				<div className="gallery-img">
					<p className="gallery-info">Kindness Odokara</p>
					<img src={Kindness} alt="Kindness" />
					<p className="gallery-email">kindness866@gmail.com</p>
				</div>
				<div className="gallery-img">
					<p className="gallery-info"> Remilekun Odegbami</p>
					<img src={Remilekun} alt="Remilekun" />
					<p className="gallery-email">remdev22@gmail.com</p>
				</div>
				<div className="gallery-img">
					<p className="gallery-info">Vivian Patrick</p>
					<img src={Vivian} alt="Vivian" />
					<p className="gallery-email">vivianpatrick@gmail.com</p>
				</div>
				
			</div>
		</div>
	);
}
