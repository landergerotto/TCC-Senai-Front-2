import styles from "./ProductionOrders.module.css";

function ProductionOrders({ numOrders = 0 }) {
    return(
        <div>
            {numOrders}
            Ordens de Produção
        </div>
    )
}

export default ProductionOrders;