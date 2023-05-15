import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Card, Table, Search } from '@alifd/next';
import styles from './index.module.css';

const FunctionDetail1 = (props) => {
  const [tableData1, setTableData1] = useState([]);
  const [originalData1, setOriginalData1] = useState([]);
  const [searchValue1, setSearchValue1] = useState('');
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data1 = [];
      const response1 = await fetch('./Records-200/query_results_1.json');
      const json1 = await response1.json();
      const { records } = json1;
      const jsonData1 = Object.keys(records).map((key) => ({
        hashes: records[key].hashes,
        round: parseInt(key),
        query_latency: records[key].query_latency,
      }));
      data1.push(...jsonData1);
      setTableData1([]);
      setOriginalData1(data1);
    }
    fetchData();
  }, []);

  const onSearchClick1 = (value) => {
    // setIsSearchClicked(true);
    setSearchValue1(value);
    setLoading1(true);
    let filteredData1;
    if (value) {
      filteredData1 = originalData1.filter((data) => data.hashes.includes(value));
    }
    setTableData1(filteredData1);
    setLoading1(false);
  };

  const renderHashCell = (value, index, record) => {
    if (record.hashes.includes(searchValue1)) {
      return <div>[{searchValue1}]</div>;
    } else {
      return <div>[{value}]</div>;
    }
  };

  return (
    <div>
      <Box spacing={20} margin={0}>
        <Card free>
          <Card.Header title="交易查询一" />
          <Card.Divider />
          <Card.Content>
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              <p> </p>
            </Box>
            <div style={{ marginLeft: '30px', marginRight: '10px' }}>
              <Search
                type="primary"
                hasIcon={false}
                searchText="查询交易"
                onSearch={onSearchClick1}
                placeholder="请输入哈希值"
              />
              <p> </p>
              <Table
                dataSource={tableData1}
                hasBorder
                className={styles.mainTable}
                align="center"
              >
                <Table.Column title="所在轮次" dataIndex="round" width={90} align="center" />
                <Table.Column
                  title="交易哈希"
                  width={540}
                  align="center"
                  dataIndex="hashes"
                  cell={renderHashCell}
                />
                <Table.Column title="查询时延" dataIndex="query_latency" width={100} align="center" />
              </Table>
            </div>
          </Card.Content>
        </Card>
      </Box>
    </div>
  );
};

export default FunctionDetail1
