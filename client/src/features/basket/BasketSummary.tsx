import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  if (subtotal === undefined)
    subtotal =
      basket?.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) ?? 0;
  const deliveryFee = 100;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}> {itemCount} item</TableCell>
              <TableCell align="right">
                ₱<b>{(subtotal / 100).toFixed(2)}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee</TableCell>
              <TableCell align="right">
                ₱<b>{deliveryFee.toFixed(2)}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                ₱<b>{(subtotal / 100 + deliveryFee).toFixed(2)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
