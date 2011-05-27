<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output indent="yes"
              method="xml"
              version="1.0"
              encoding="utf-8"
              doctype-public="-//OASIS/DTD DocBook XML V4.5//EN"
              doctype-system="http://www.oasis-open.org/docbook/xml/4.5/docbookx.dtd"
  />

  <xsl:param name="ostofind"        select = "'all'" />
  <xsl:param name="userleveltofind" select = "'all'" />
  <xsl:param name="conditiontofind" select = "'all'" />

  <xsl:template match="node()|@*|processing-instruction()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- tried combining logic but xsltproc wouldn't compile the boolean expressions! -->

  <xsl:template match="*[@condition or @userlevel or @os]">
    <xsl:choose>

      <xsl:when test="(not (@condition))
                  and (not (@userlevel))
                  and (@os=$ostofind               or $ostofind       ='all')">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(not (@condition))
                  and (@userlevel=$userleveltofind or $ostofind       ='all')
                  and (not (@ostofind))">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(not (@condition))
                  and (@userlevel=$userleveltofind or $userleveltofind='all')
                  and (@os=$ostofind               or $ostofind       ='all')">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(@condition=$conditiontofind or $conditiontofind='all')
                  and (not (@userlevel))
                  and (not (@ostofind))">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(@condition=$conditiontofind or $conditiontofind='all')
                  and (not (@userlevel))
                  and (@os=$ostofind               or $ostofind       ='all')">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(@condition=$conditiontofind or $conditiontofind='all')
                  and (@userlevel=$userleveltofind or $userleveltofind='all')
                  and (not (@os))">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

      <xsl:when test="(@condition=$conditiontofind or $conditiontofind='all')
                  and (@userlevel=$userleveltofind or $userleveltofind='all')
                  and (@os=$ostofind               or $ostofind       ='all')">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>

    </xsl:choose>
  </xsl:template>

  <xsl:template match="articleinfo/title">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
    <subtitle><xsl:value-of select="$ostofind"/><xsl:text> </xsl:text>
              <xsl:value-of select="$userleveltofind"/><xsl:text> </xsl:text>
              <xsl:value-of select="$conditiontofind"/>
    </subtitle>
  </xsl:template>

</xsl:stylesheet>
