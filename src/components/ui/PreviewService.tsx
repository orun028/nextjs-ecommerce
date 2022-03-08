import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'whiteAlpha.800'}>{text}</Text>
    </Stack>
  );
};

export default function PreviewService() {
  return (
    <Box p={4} bg='green.400' rounded='md' color='white' shadow='md'>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Hổ trợ 24/7'}
          text={
            'Tư vấn sản phẩm, giải quyết dịch vụ khách hàng.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Thương hiệu uy tín'}
          text={
            'Với tôn chỉ đẹp giản dị, vải mát chất lượng được mọi yêu thích.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Giao hàng tối ưu'}
          text={
            'Miễn phí vận chuyển khi đạt tối thiểu 500k quá trình giao hàng nhanh liên hệ ngay khi chốt đơn.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}