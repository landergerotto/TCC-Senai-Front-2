import Table from 'react-bootstrap/Table';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from './Tabela.module.css';

function Tabela({ title, fields, data }) {
    return (
        <div className={styles.body}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.tabela}>
                <Table striped bordered hover >
                    <thead >
                        <tr className={styles.header}>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <th key={index}>{field.label}</th>
                                    )
                                })
                            }
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabela}>
                        {
                            data.map((info, index) => {
                                return (
                                    <tr>
                                        <td key={index}>{info.proccess}</td>
                                        <td key={index}>{info.lote}</td>
                                        <td key={index}>{info.qntdLote}</td>
                                        <td key={index}>{info.qntdRefugo}</td>
                                        <td key={index}>{info.partNumber}</td>
                                        <td key={index}>{info.movimentacao}</td>
                                        <td key={index}>{info.edv}</td>
                                        <td key={index}>{info.interditado}</td>
                                        <td key={index}>{info.status == "waiting" ?
                                            <button className={styles.btnDelete} onClick={() => console.log(info.status)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                            :
                                            <button className={styles.btnConfirm} onClick={() => console.log(info.status)}>
                                                <i className="bi bi-check"></i>
                                            </button>
                                        }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Tabela;