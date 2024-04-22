import MyNavbar from "../components/MyNavbar";
import BooksTable from "../components/BooksTable";

export default function AdminPanel(){
    return(
        <div>
            <MyNavbar />
            <BooksTable></BooksTable>
        </div>
    );
}