import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Selection } from "@heroui/table";

// --- Footer Component ---
export default function CourseTableFooter({
  selectedKeys,
  filteredItemsLength,
  page,
  pages,
  setPage,
  onPreviousPage,
  onNextPage,
}: {
  selectedKeys: Selection;
  filteredItemsLength: number;
  page: number;
  pages: number;
  setPage: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItemsLength} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
