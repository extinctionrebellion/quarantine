import axios from 'axios';
import Header from "../components/Header";
import getApiUrl from "../src/helpers/getApiUrl";
import React, {useEffect} from "react";
import ProposalCard from "../components/ProposalCard";

export default function Proposals() {

  const [items, setItems] = React.useState([]);

  function getItems() {
    return axios.get(getApiUrl('requests')).then((res) => {
      setItems(res.data);
    });
  }

  /**
   * On component did mount
   */
  useEffect(() => {
    getItems();
  }, []);

  return <React.Fragment>
    <Header></Header>
    {items.map((item) => <ProposalCard item={item}></ProposalCard>)}
  </React.Fragment>;
}