import { Avatar, Card, Layout, Typography, Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import { Company } from '@app/entities/Company';
import getDbClient from '@app/config';

const { Content } = Layout
const { Title, Paragraph} = Typography

interface CompanyItemProps {
  item: Company
}
const getChildren = (parentId, units) => {
  return units.filter(unit=> {
    return parentId ? unit.__parent__?.d === parentId : unit.__parent__ === parentId || []
  })
}

const renderUnitCardWithChildren = (parentId, units) => {
  return (
    <>
      {getChildren(parentId, units).map((unit) => {
        return (
          <div key={`unit_${unit?.id}`} className={`unit-card ${unit.__parent__ ? '' : ' root-unit'}`}>
            {unit?.__parent__?.id ? <div className="decorator" /> : []}
            <Card style={{ border: '1px solid #e7e7e7', margin: 0}} bodyStyle={{ padding:'10px 8px', width: 245 }}>
              <Row wrap={false}>
                <Col flex="none">
                  <Avatar style={{backgroundColor:'#fff', border: '1px solid #e7e7e7', color:'#7A7A7A'}}>
                    {(unit.unit.first_name || unit.unit.last_name || unit.unit.patronymic).slice(0, 1).toUpperCase()}
                  </Avatar>
                </Col>
                <Col flex="auto">
                  <Paragraph style={{margin: '0 0 0 10px', fontSize:14 }}>{`${unit.unit.first_name} ${unit.unit.last_name}`}</Paragraph>
                  <Paragraph style={{margin: '0 0 0 10px', fontSize: 12, color:'#7A7A7A'}}>{`${unit.position}`}</Paragraph>
                </Col>
              </Row>
            </Card>
            <div>{unit?.__parent__?.id ? renderUnitCardWithChildren(unit.__parent__.id, units) : []}</div>
          </div>
        )
      })}
    </>
  )
}

const CompanyItem: React.FC<CompanyItemProps> = ({ item }) => {
  const units = item['__units__'] || []

  return (
    <Layout>
      <Content className="site-layout" style={{ padding: '50px' }}>
        <Content style={{ margin: '24px' }}>
          <Card style={{ width: 812, border: '1px solid #eee',  }} bodyStyle={{ padding: '18px' }}>
            <Paragraph style={{color:'#7A7A7A', fontSize: 12, margin:0 }}>КОМПАНИЯ</Paragraph>
            <Title level={2} style={{fontSize: 32, margin:0, padding:'0 0 6px'}}>{item.title}</Title>
            <Paragraph style={{color:'#7A7A7A', fontSize: 12, margin:'0 0 22px' }}>{item.description}</Paragraph>
            {renderUnitCardWithChildren(null, units)}
          </Card>
        </Content>
      </Content>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<CompanyItemProps> = async (req) => {
  const repository = (await getDbClient()).getRepository(Company);
  const result = await repository.findOne({
    where: { id: parseInt(req.query.id as string) },
    relations: [ 'units', 'units.parent' ]
  })
  return { props: { item: JSON.parse(JSON.stringify(result)) as Company } }
}

export default CompanyItem;
