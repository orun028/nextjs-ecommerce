import { Heading, FormControl, Input, FormLabel, CheckboxGroup, Stack, Checkbox, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from "@chakra-ui/react";

const Fillter = () => {
  return (<>
    <Heading fontSize={"lg"} pb="2">
      Tìm kiếm
    </Heading>
    <form>
      <FormControl py="3">
        <Input placeholder="Tên sản phẩm" />
      </FormControl>
      <FormControl py="3">
        <FormLabel>Danh mục sản phẩm</FormLabel>
        <CheckboxGroup
          colorScheme="green"
          defaultValue={["naruto", "kakashi"]}
        >
          <Stack spacing={[1, 5]} direction={"column"}>
            <Checkbox value="naruto">Sản phẩm mới</Checkbox>
            <Checkbox value="sasuke">Khuyến mãi</Checkbox>
            <Checkbox value="kakashi">Phụ kiện</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
      <FormControl py="3">
        <FormLabel>Giá sản phẩm</FormLabel>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="green"
          defaultValue={30}
          width="80%"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <Button py="3" type="submit">
        Tìm kiếm
      </Button>
    </form>
  </>);
};

export default Fillter;
