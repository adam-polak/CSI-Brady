import ArrowLeft from "../icons/Arrow";
import { Container } from 'reactstrap';

export default function NavHeader({ link }) {
    return (
        <Container fluid className="grey-dashboard p-2">
            <ArrowLeft size="48" color="grey" />
        </Container>
    );
}