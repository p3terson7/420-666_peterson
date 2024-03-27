import { useTranslation } from "react-i18next";
import "../../App.css";

const PageNotFound = () => {
    const {t} = useTranslation();

    return (
        <>
            <h1 className="text-center">{t("pageNotFound")}</h1>
        </>
    );
};

export default PageNotFound;
