import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";

export default function AboutUs() {
    return (
        <div>
            <MyNavbar/>
            <div className="w-full p-24">
                <p className="text-black text-3xl">Welcome to our bookstore!</p>

                <p className="text-bold mt-8 text-xl"> We are a team of enthusiasts who are passionate about reading
                    and
                    knowledge. Our mission is to share this passion with you, our valued customers. In our store you
                    will
                    find a wide selection of books for every taste and interest. From classical literature to modern
                    bestsellers, from scientific works to fantastic adventures, we offer a wide range of book works to
                    meet the most diverse requests and needs of our readers</p>

                <p className="mt-8 text-xl">We strive to provide you not only with high-quality books, but also with a
                    high level of service. Our team is ready to help you with your choice, answer your questions and
                    provide a
                    pleasant and
                    comfortable
                    shopping experience. Here you will find not only books, but also other goods and services related to
                    the world of
                    reading.
                    From gift certificates and reading accessories to book events and meetings with authors, we do
                    our best
                    to make your reading even more fun and enjoyable.</p>

                <p className="mt-8 text-xl"></p>

                <p className="mt-8 text-xl">Thank you for choosing our bookstore. We hope that you will find something
                    special and inspiring
                    for
                    yourself here. Join our community of readers and let's discover the world of knowledge and
                    imagination
                    together!</p>

                <p className="mt-16 text-bold text-3xl">With respect,</p>
                <p className="text-2xl "> The team of our book store</p>
            </div>
            <Footer/>
        </div>
    );
}