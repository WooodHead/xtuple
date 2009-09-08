<?xml version="1.0"?>
<xsl:stylesheet version="2.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output indent="yes" method="xml" encoding="ascii" />
  <xsl:output doctype-public="-//OASIS//DTD DocBook XML V4.3//EN" />
  <xsl:output doctype-system="http://www.oasis-open.org/docbook/xml/4.3/docbookx.dtd"/>
  <xsl:param name="filebase" select="'put base name of file here'"/>

 <!-- identity -->
 <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="author|comment|exportmacro"/>

  <xsl:template match="ui">
    <xsl:element name="section">
      <xsl:element name="title" >
	<xsl:value-of select="widget[1]/property[@name='windowTitle']"/>
      </xsl:element>
      <subtitle>
	<xsl:value-of select="class"/>
	<xsl:text> : </xsl:text>
	<xsl:value-of select="widget[1]/@class"/>
      </subtitle>
      <para>
	Introductory description, perhaps the What's This property of the
	window or dialog itself.
      </para>
      <xsl:element name="para">
	<xsl:attribute name="id"
		       select="concat('ScreenShot', generate-id())"/>
	<screenshot>
	  <mediaobject>
	    <imageobject>
	      <xsl:element name="imagedata">
		<xsl:attribute name="fileref"
			       select="concat('images/',
						     $filebase, '.png')"/>
	      </xsl:element>
	    </imageobject>
	    <xsl:element name="caption">
	      <xsl:attribute name="id"
			     select="concat('Caption', generate-id())"/>
	      <xsl:value-of select="/ui/widget[1]/property[@name='windowTitle']"/>
	    </xsl:element>
	  </mediaobject>
	</screenshot>
      </xsl:element>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>


  <xsl:template match="widget[@class='QMainWindow' or @class='QDialog']">
    <table>
      <title>
	List of Widgets
      </title>
      <tgroup cols="3">
	<thead>
	  <row>
	    <entry>Title</entry>
	    <entry>Internal Name</entry>
	    <entry>Widget Type</entry>
	  </row>
	</thead>
	<tbody>
	  <xsl:apply-templates/>
	</tbody>
      </tgroup>
    </table>
  </xsl:template>

  <xsl:template match="widget">
    <xsl:element name="row">
      <xsl:element name="entry">
	<xsl:choose>
	  <xsl:when test="property[@name='text']">
	    <xsl:element name="guilabel">
	    <xsl:if test="property[@name='text']/string/text()">
	      <xsl:analyze-string select="property[@name='text']/string/text()"
				  regex="&amp;." >
		<xsl:matching-substring>
		  <accel><xsl:value-of select="substring(., 2)"/></accel>
		</xsl:matching-substring>
		<xsl:non-matching-substring>
		  <xsl:value-of select="."/>
		</xsl:non-matching-substring>
	      </xsl:analyze-string>
	    </xsl:if>
	    </xsl:element>
	  </xsl:when>
	  <xsl:when test="child::attribute[@name='title']/node()">
	    <xsl:copy-of select="attribute[@name='title']/string/text()"/>
	  </xsl:when>
	</xsl:choose>
      </xsl:element>
      <xsl:element name="entry">
	<xsl:value-of select="@name"/>
      </xsl:element>
      <xsl:element name="entry" >
	<xsl:value-of select="@class"/>
      </xsl:element>
    </xsl:element>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="item
		      |layout">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="attribute
		      |class
		      |connections
		      |customwidgets
		      |includes
		      |layoutdefault
		      |pixmapfunction
		      |property
		      |resources
		      |spacer
		      |tabstops"/>

</xsl:stylesheet>
