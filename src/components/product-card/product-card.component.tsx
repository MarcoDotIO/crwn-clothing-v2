import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import './product-card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
} from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
    product: CategoryItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to card
            </Button>
        </ProductCartContainer>
    );
}

export default ProductCard;