import React from "react";
import styles from './cities.module.scss'
import {Row} from "react-bootstrap";
import {Button} from "reactstrap";
import CitiesList from "../CitiesList";

function Cities({cities}) {
    return (
        <>
            <div className={styles.cities}>
                <h1 className={styles.title}>
                    ЗАГОЛОВОК
                </h1>
                <Row className={styles.row_images}>
                    {cities.map((citi, index)=>(
                        <CitiesList key={index} citi={citi}/>
                    ))}
                </Row>
                <Button color="primary" className="py-2 px-5 box-button" role={"link"} href={'/oll_city'}>
                    все города
                </Button>
            </div>
        </>
    )
}
export default Cities