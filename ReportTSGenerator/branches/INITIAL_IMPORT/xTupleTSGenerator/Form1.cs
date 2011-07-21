using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Npgsql;
using System.Xml.Linq;

namespace xTupleTSGenerator
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnGenerate_Click(object sender, EventArgs e)
        {
            NpgsqlConnection conn = new NpgsqlConnection(String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",txtServer.Text,txtPort.Text,txtUser.Text,txtPassword.Text,txtDBName.Text));
            conn.Open();

            NpgsqlCommand command = new NpgsqlCommand("select * from report", conn);
           
            try
            {
                NpgsqlDataReader dr = command.ExecuteReader();

                XDocument xmlTS = new XDocument();
             
                // Données de base
                xmlTS.Add(new XDocumentType("TS",null,null,null));

                XElement ts = new XElement("TS",new XAttribute("version","2.0"));
                xmlTS.Add(ts);


                while (dr.Read())
                {
                    XDocument xmlReport = XDocument.Parse(dr["report_source"].ToString());
                         

                    XElement context = new XElement("context", new XElement("name",xmlReport.Element("report").Element("name").Value));
                    ts.Add(context);

                    
                    foreach (XElement label in from i in xmlReport.Element("report").Descendants("label") select i)
                    {
                        XElement message = new XElement("message",
                                    new XElement("source", label.Element("string").Value),
                                    new XElement("translation",
                                        new XAttribute("type", "unfinished"), "")
                                );

                      //  if (chkWidth.Checked) message.AddFirst(new XElement("width", label.Element("rect").Element("width").Value));

                        context.Add(message);

                    }
                    
                }
                
                xmlTS.Save(txtTSFilename.Text);
                MessageBox.Show("Conversion terminée");
            }

            finally
            {
                conn.Close();
            }
        }


    }
}
