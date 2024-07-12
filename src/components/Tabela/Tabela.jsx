import Table from 'react-bootstrap/Table';

import styles from './Tabela.module.css';

function Tabela({ fields, title }) {
    return (
        <>
            <div className={styles.title}>
                {title}
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            fields.map((field, index) => {
                                return (
                                    <th key={index}>{field.label}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                {/* <tbody>
                <tr>
                <td>1</td>
                </tr>
            </tbody> */}
            </Table>
        </>
    )
}

export default Tabela;