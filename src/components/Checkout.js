import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers";

const Checkout = () => {
  const { totalAmount, shippingFee } = useCartContext();

  return (
    <Wrapper>
      <h3>Your total is {formatPrice(totalAmount + shippingFee)}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Checkout;
