import React, { useState, useEffect } from "react";
import { size } from "lodash";
import StatusBarCustom from "../../shared/StatusBarCustom";
import SearchBarCustom from "../../search/components/SearchBarCustom";
import SearchList from "../components/SearchList";
import ScreenLoading from "../../shared/ScreenLoading";
import SearchNotFound from "../../search/pages/SearchNotFound";
import { searchProductsApi } from "../../product/services/ProductService";

export default function SearchFound(props) {
  //props enviados
  const { route } = props;
  const { params } = route;
  //variable de estado, busqueda activa
  const [searchActive, setSearchActive] = useState(true);
  //
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductsApi(params.search);
      setProducts(response);
    })();
  }, [params.search]);

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <SearchBarCustom
        currentSearch={params.search}
        setSearchActive={setSearchActive}
      ></SearchBarCustom>
      {!products ? (
        <ScreenLoading text="Buscando productos"></ScreenLoading>
      ) : size(products) === 0 ? (
        <SearchNotFound search={params.search}></SearchNotFound>
      ) : (
        <SearchList products={products}></SearchList>
      )}
    </>
  );
}
