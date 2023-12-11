import React from "react";
import styles from './cities.module.scss'
import {Row} from "react-bootstrap";
import {Button} from "reactstrap";

function Cities({cities}) {
    return (
        <>
            <div className={styles.cities}>
                <h1 className={styles.title}>
                    ЗАГОЛОВОК
                </h1>
                <Row className={styles.row_images}>

                </Row>
                <Button color="primary" className="py-2 px-5 box-button" role={"link"} href={'/oll_city'}>
                    все города
                </Button>
            </div>
        </>
    )
}
export default Cities