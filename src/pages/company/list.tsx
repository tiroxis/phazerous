import { Layout, List } from 'antd';
import { GetServerSideProps } from 'next';
import { Company } from '@app/entities/Company';
import Link from 'next/link';
import getDbClient from '@app/config';

const { Content } = Layout
interface CompanyListProps {
  list: Company[]
}
const CompanyList: React.FC<CompanyListProps> = ({ list }) => {
  return (
    <Layout>
      <Content className="site-layout" style={{ padding: '50px' }}>
        <Content style={{ margin: '24px' }}>
          <List
            style={{background: '#FFF'}}
            header={<div>Компании</div>}
            bordered
            dataSource={list}
            pagination={{position: 'bottom', align: 'center'}}
            renderItem={(item) => (
              <List.Item>
                <Link href={`/company/${item.id}`}>{item.title}</Link>
              </List.Item>
            )}
          />
        </Content>
      </Content>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<CompanyListProps> = async (req) => {
  const repository = (await getDbClient()).getRepository(Company);
  const result = await repository.find({
    skip: parseInt(req.query._start as string) || 0,
    take: parseInt(req.query._end  as string) - parseInt(req.query._start  as string) || 10
  })
  return { props: { list: JSON.parse(JSON.stringify(result)) } }
}

export default CompanyList;
