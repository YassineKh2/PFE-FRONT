import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
function HoldingList() {
  return (
    <div className="w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <p className="text-2xl dark:text-white font-semibold">Holding List</p>

      <Table
        removeWrapper
        aria-label="Example static collection table "
        className="mt-4"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Sector</TableColumn>
          <TableColumn>Instrument</TableColumn>
          <TableColumn>Assets</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>Mutual Fund</TableCell>
            <TableCell>20%</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Holdings</TableCell>
            <TableCell>IT</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>16%</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Agriculture</TableCell>
            <TableCell>ETF</TableCell>
            <TableCell>15%</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>HeathTech</TableCell>
            <TableCell>-</TableCell>
            <TableCell>10%</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>FinStar Inc</TableCell>
            <TableCell>Finance</TableCell>
            <TableCell>Stocks</TableCell>
            <TableCell>7%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default HoldingList;
