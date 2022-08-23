import { useState } from "react";
import { useEffect } from "react";
import './orders.css'
import { List, ScrollSync, AutoSizer, CellMeasurerCache, CellMeasurer } from "react-virtualized";
import * as lorem from 'lorem-ipsum';
import { Form } from "react-bootstrap";

const listHeight = 600;
const rowHeight = 100;
const rowWidth = 1080;
const rowCount = 1000;

const Orders = () => {
    const [posts, setPosts] = useState([]);
    const [filtered, setfiltered] = useState([]);
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    });
    useEffect(() => {
        const list = Array(rowCount).fill().map((val, idx) => {
            return {
                id: idx,
                title: lorem.loremIpsum({
                    count: 1,
                    units: 'sentences',
                    sentenceLowerBound: 2,
                    sentenceUpperBound: 3
                }),
                subtitle: lorem.loremIpsum({
                    count: 1,
                    units: 'sentences',
                    sentenceLowerBound: 2,
                    sentenceUpperBound: 10
                }),
                image: 'http://via.placeholder.com/40',
                content: lorem.loremIpsum({
                    count: 1,
                    units: 'sentences',
                    sentenceLowerBound: 4,
                    sentenceUpperBound: 40
                })
            }
        });
        const sorted = list.sort(function (a, b) {
            return a.title.localeCompare(b.title)
        })
        setPosts(sorted)
        setfiltered(sorted)
    }, []);

    const filterText = (search) => {
        console.log(search)
        if (search.length > 0) {
            let filtered = posts.filter(p => {
                return p.title.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
            });

            setfiltered(filtered)
        } else {
            setfiltered(posts)
        }
    }

    const renderRow = ({ index, key, style, parent }) => {
        const post = filtered[index]
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style} className="row">
                    <div className="image">
                        <img src={post.image} alt="" />
                    </div>
                    <div className="content">
                        <h5>{post.title}</h5>
                        <h6>{post.subtitle}</h6>
                        <div>{post.content}</div>
                    </div>
                </div>
            </CellMeasurer>
        );
    }


    return (
        <div className="list">
            <div className="App">
                <div>
                    <>
                        <Form.Label htmlFor="inputPassword5">Search</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => filterText(e.target.value)}
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Found {filtered.length}
                        </Form.Text>
                    </>
                </div>
                <div className="list">
                    <AutoSizer>
                        {
                            ({ width, height }) => {
                                return <List
                                    width={width}
                                    height={height}
                                    deferredMeasurementCache={cache}
                                    rowHeight={cache.rowHeight}
                                    rowRenderer={renderRow}
                                    rowCount={filtered.length}
                                    overscanRowCount={3} />
                            }
                        }
                    </AutoSizer>
                </div>
            </div>
        </div>
    )
}

export default Orders;