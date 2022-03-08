import { Heading, FormControl, Input, FormLabel, CheckboxGroup, Stack, Checkbox, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Box } from "@chakra-ui/react";

interface PropsFillter{
  layout: string
  title?: string
}
const Fillter = ({layout, title}: PropsFillter) => {
  return (<Box >
    {title && <Heading fontSize={"lg"} pb="2">
      {title}
    </Heading>}
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
  </Box>);
};

export default Fillter;
