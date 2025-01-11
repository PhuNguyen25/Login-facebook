import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import Cookies from "js-cookie";
import { Form, Table, Button, Modal, Nav } from "react-bootstrap";
import Style from "./style.module.scss";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [pages, setPages] = useState([]);
  const [ads, setAds] = useState([]);
  const [activeTab, setActiveTab] = useState("pages");
  const [businesses, setBusinesses] = useState([]);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      Cookies.set("fb_token", response.accessToken, { expires: 7 });

      setAccount({
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });

      fetchPagesAndAccount(response.accessToken);
      window.location.reload();
    }
  };

  const fetchPagesAndAccount = async (token) => {
    try {
      const pagesRes = await fetch(
        `https://graph.facebook.com/v17.0/me/accounts?access_token=${token}`
      );
      const pagesData = await pagesRes.json();
      setPages(pagesData.data);

      const adsRes = await fetch(
        `https://graph.facebook.com/v17.0/me/adaccounts?access_token=${token}`
      );
      const adsData = await adsRes.json();

      const detailedAdsData = await Promise.all(
        adsData.data.map(async (ad) => {
          const adDetailsRes = await fetch(
            `https://graph.facebook.com/v17.0/${ad.id}?fields=id,name,currency,amount_spent,balance,account_status&access_token=${token}`
          );
          const adDetails = await adDetailsRes.json();
          return adDetails;
        })
      );

      setAds(detailedAdsData);
      const businessRes = await fetch(
        `https://graph.facebook.com/v17.0/me/businesses??fields=verification_status,created_time&access_token=${token}`
      );
      const businessData = await businessRes.json();
      setBusinesses(businessData.data);
      const accountRes = await fetch(
        `https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`
      );
      const accountData = await accountRes.json();
      setAccount({
        name: accountData.name,
        email: accountData.email,
        picture: accountData.picture.data.url,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("fb_token");
    if (token) {
      fetchPagesAndAccount(token);
    }
  }, []);

  return (
    <div className="App">
      {account ? (
        <div className="account-info">
          <img />
          <div className={Style.header_table}>
            <div className={Style.header_table_container}>
              <div className={`${Style.app_search} d-none d-lg-block mx-3`}>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                  />
                </div>
              </div>
              <div className={Style.header_btn_group}>
                <div
                  className={`${Style.btn_group} btn-group`}
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <button
                    id="btnGroupDrop1"
                    type="button"
                    className={`${Style.btn_filter} btn dropdown-toggle`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaFilter /> Danh mục
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <li>
                      <a className="dropdown-item" href="#">
                        Dropdown link
                      </a>
                    </li>
                  </ul>
                </div>
                <button className={Style.header_add_button}>
                  <div>
                    <FaPlus />
                    <span>Thêm bài viết</span>
                  </div>
                </button>
                <button className={Style.header_delete_button}>
                  <div>
                    <FaRegTrashAlt />
                    <span>Xoá</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                <Nav.Item>
                  <Nav.Link eventKey="pages">Pages</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ads">Ads</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bm">BM</Nav.Link>
                </Nav.Item>
              </Nav>

              {activeTab === "pages" ? (
                <Table className={Style.table} responsive hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID</th>
                      <th>Page Name</th>
                      <th>Page Type</th>
                      <th>Access Rights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages?.map((page) => (
                      <tr key={page.id}>
                        <td>
                          <input className="form-check-input" type="checkbox" />
                        </td>
                        <td>{page.id}</td>
                        <td>{page.name}</td>
                        <td>{page.category}</td>
                        <td>{page.tasks?.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : activeTab === "ads" ? (
                <Table className={Style.table} responsive hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID</th>
                      <th>Ad Account Name</th>
                      <th>Currency</th>
                      <th>Amount Spent</th>
                      <th>Balance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ads?.map((ad) => (
                      <tr key={ad.id}>
                        <td>
                          <input className="form-check-input" type="checkbox" />
                        </td>
                        <td>{ad.id}</td>
                        <td>{ad.name}</td>
                        <td>{ad.currency}</td>
                        <td>{ad.amount_spent}</td>
                        <td>{ad.balance}</td>
                        <td>{ad.account_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : activeTab === "bm" ? (
                <Table className={Style.table} responsive hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Level</th>
                      <th>Verified</th>
                      <th>Limit</th>
                      <th>Currency</th>
                      <th>Created Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses?.map((business) => (
                      <tr key={business.id}>
                        <td>
                          <input className="form-check-input" type="checkbox" />
                        </td>
                        <td>{business.id}</td>
                        <td>{business.name}</td>
                        <td>{business.level}</td>
                        <td>
                          {business.verification_status
                            ? "Verified"
                            : "Not Verified"}
                        </td>
                        <td>{business.limit}</td>
                        <td>{business.currency}</td>
                        <td>
                          {new Date(business.created_time).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <FacebookLogin
          appId="1052016440060467"
          autoLoad={false}
          fields="name,email,picture"
          scope="email,pages_show_list,ads_management,ads_read,business_management"
          callback={responseFacebook}
          textButton="Đăng nhập Facebook"
          cssClass="facebook-button"
          version="20.0"
        />
      )}
    </div>
  );
}

export default Dashboard;
